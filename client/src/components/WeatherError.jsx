import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WeatherError({ message, onRetry }) {
  return (
    <Card className="rounded-2xl p-6 md:p-8 animate-in fade-in duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Unable to Fetch Weather</h3>
          <p className="text-base font-medium text-muted-foreground max-w-md" data-testid="text-error-message">
            {message}
          </p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-2" data-testid="button-retry">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}
