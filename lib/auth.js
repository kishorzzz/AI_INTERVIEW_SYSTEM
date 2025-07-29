import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function verifyToken(request) {
  try {
    // Try to get token from cookie first
    const cookieStore = cookies()
    let token = cookieStore.get("auth-token")?.value

    // If no cookie, try Authorization header
    if (!token) {
      const authHeader = request.headers.get("authorization")
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
}
