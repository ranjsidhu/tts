import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import {
  verifyPassword,
  generateToken,
  setTokenCookie,
  getTokenFromCookies,
  verifyToken,
} from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Check if user is already logged in
    const existingToken = await getTokenFromCookies();
    if (existingToken) {
      const decoded = verifyToken(existingToken);
      if (decoded) {
        // User is already logged in, return their data
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });

        if (user) {
          return NextResponse.json(user);
        }
      }
    }

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate token and set cookie
    const token = generateToken(user.id);
    await setTokenCookie(token);

    // Return user data (excluding password)
    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
