import 'server-only'; 
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";


export async function getUserIdFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded.userId as string | null;
  } catch (error) {
    console.log("Invalid token");
    return null;
  }
}