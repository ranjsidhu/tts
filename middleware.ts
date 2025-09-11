// middleware.ts (in root directory)
import { NextRequest, NextResponse } from "next/server";
import { config as appConfig } from "./app/utils/config";

const { middlewareConfigMaxReqs } = appConfig;

// Simple in-memory store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface RateLimitRule {
  pattern: string | RegExp;
  config: RateLimitConfig;
  exclude?: boolean; // Mark routes to exclude from rate limiting
}

const rateLimitRules: RateLimitRule[] = [
  // Exclude session endpoint - no rate limiting
  {
    pattern: "/api/auth/session",
    config: { windowMs: 0, maxRequests: 0 },
    exclude: true,
  },

  // Strict limits for auth endpoints (except session)
  {
    pattern: /^\/api\/auth\/(?!session)/, // Regex: /api/auth/* but not /api/auth/session
    config: {
      windowMs: 15 * middlewareConfigMaxReqs.ONE_MINUTE, // 15 minutes
      maxRequests: middlewareConfigMaxReqs.auth,
      message: "Too many authentication attempts",
    },
  },

  // Public API endpoints with higher limits
  {
    pattern: "/api/jobs/latest/:path*",
    config: {
      windowMs: middlewareConfigMaxReqs.windowMs, // 1 minute
      maxRequests: middlewareConfigMaxReqs.latestJobs,
    },
  },
  {
    pattern: "/api/testimonials/:path*",
    config: {
      windowMs: middlewareConfigMaxReqs.windowMs, // 1 minute
      maxRequests: middlewareConfigMaxReqs.testimonials,
    },
  },
  {
    pattern: "/api/contact-us",
    config: {
      windowMs: middlewareConfigMaxReqs.windowMs, // 1 minute
      maxRequests: middlewareConfigMaxReqs.contactUs,
    },
  },

  // User-specific endpoints (requires auth)
  //   {
  //     pattern: "/api/user/:userId/:path*",
  //     config: {
  //       windowMs: middlewareConfigMaxReqs.windowMs,
  //       maxRequests: 500,
  //       message: "User API rate limit exceeded",
  //     },
  //   },

  {
    pattern: "/api/admin/:path*",
    config: {
      windowMs: middlewareConfigMaxReqs.windowMs,
      maxRequests: middlewareConfigMaxReqs.admin,
      message: "Admin API rate limit exceeded",
    },
  },

  // Default for all other API routes
  {
    pattern: "/api/:path*",
    config: {
      windowMs: middlewareConfigMaxReqs.windowMs,
      maxRequests: middlewareConfigMaxReqs.default,
    },
  },
];

function getClientIdentifier(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] ?? realIP ?? "unknown";

  // You can also combine with other identifiers:
  // const userAgent = request.headers.get('user-agent') || '';
  // return `${ip}:${userAgent.slice(0, 100)}`;

  return ip;
}

function matchesPattern(pathname: string, pattern: string | RegExp): boolean {
  if (pattern instanceof RegExp) {
    return pattern.test(pathname);
  }

  // Convert Next.js style patterns to regex
  // :path* becomes (.*)
  // :id becomes ([^/]+)
  // :slug becomes ([^/]+)
  const regexPattern = pattern
    .replace(/:\w+\*/g, "(.*)") // :path* -> (.*)
    .replace(/:\w+/g, "([^/]+)") // :id -> ([^/]+)
    .replace(/\//g, "\\/"); // Escape forward slashes

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
}

function getRateLimitRule(pathname: string): RateLimitRule | null {
  // Find the first matching rule (order matters!)
  for (const rule of rateLimitRules) {
    if (matchesPattern(pathname, rule.pattern)) {
      return rule;
    }
  }

  return null;
}

function cleanupExpiredEntries() {
  const now = Date.now();
  rateLimitStore.forEach((data, key) => {
    if (now > data.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply rate limiting to API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const rule = getRateLimitRule(pathname);
  if (!rule || rule.exclude) {
    // No rate limiting for excluded routes or unmatched routes
    return NextResponse.next();
  }

  const config = rule.config;
  const clientId = getClientIdentifier(request);
  const key = `${pathname}:${clientId}`;
  const now = Date.now();

  // Cleanup expired entries occasionally
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  let rateLimitData = rateLimitStore.get(key);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitData = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, rateLimitData);
  } else {
    rateLimitData.count++;
  }

  const remaining = Math.max(0, config.maxRequests - rateLimitData.count);
  const resetTimeSeconds = Math.ceil((rateLimitData.resetTime - now) / 1000);

  // Add rate limit headers
  const response =
    rateLimitData.count > config.maxRequests
      ? NextResponse.json(
          {
            error: config.message ?? "Rate limit exceeded",
            retryAfter: resetTimeSeconds,
          },
          { status: 429 }
        )
      : NextResponse.next();

  response.headers.set("X-RateLimit-Limit", config.maxRequests.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set("X-RateLimit-Reset", rateLimitData.resetTime.toString());

  if (rateLimitData.count > config.maxRequests) {
    response.headers.set("Retry-After", resetTimeSeconds.toString());
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
