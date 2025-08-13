'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useAuthStore } from '@/store/auth.store';

export default function Page() {
  const { logout } = useAuthStore();

  useEffect(() => {
    logout(); // виконається тільки один раз при завантаженні сторінки
  }, [logout]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="max-w-md w-full shadow-lg border">
        <CardHeader className="flex items-center space-x-2">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <CardTitle className="text-destructive text-lg">
            Access denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You are not logged in. Please log in to access this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
