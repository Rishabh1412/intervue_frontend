// lib/requireAuth.js
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export async function requireAuth(context) {
  const { req } = context;

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { props: { user: decoded } };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
