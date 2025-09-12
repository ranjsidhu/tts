import { type NextRequest, NextResponse } from "next/server";
import {
  checkAdminAccess,
  checkTutorAccess,
  checkAdminOrTutorAccess,
} from "@/app/utils/auth";
import { getSession } from "@/app/utils/session";

type RouteHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

export function withUserProtection(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { isAuthorized: false, error: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    return handler(req, context);
  };
}
export function withAdminProtection(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const { isAuthorized, response } = await checkAdminAccess();
    if (!isAuthorized && response) {
      return response;
    }
    return handler(req, context);
  };
}

export function withTutorProtection(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    const { isAuthorized, response } = await checkTutorAccess();
    if (!isAuthorized && response) {
      return response;
    }
    return handler(req, context);
  };
}

export function withAdminOrTutorProtection(
  handler: RouteHandler
): RouteHandler {
  return async (req, context) => {
    const { isAuthorized, response } = await checkAdminOrTutorAccess();
    if (!isAuthorized && response) {
      return response;
    }
    return handler(req, context);
  };
}
