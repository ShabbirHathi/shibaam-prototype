import { Check, Package, Truck, MapPin, Home } from 'lucide-react';
import { OrderStatus } from '@/data/orders';

interface OrderTrackerProps {
  currentStatus: OrderStatus;
  trackingHistory: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
}

const steps: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'Placed', label: 'Order Placed', icon: Check },
  { status: 'Packed', label: 'Packed', icon: Package },
  { status: 'Shipped', label: 'Shipped', icon: Truck },
  { status: 'OutForDelivery', label: 'Out for Delivery', icon: MapPin },
  { status: 'Delivered', label: 'Delivered', icon: Home },
];

const OrderTracker = ({ currentStatus, trackingHistory }: OrderTrackerProps) => {
  const currentStepIndex = steps.findIndex((s) => s.status === currentStatus);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  const getHistoryForStep = (status: OrderStatus) => {
    return trackingHistory.find((h) => h.status === status);
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = step.icon;
            const history = getHistoryForStep(step.status);

            return (
              <div key={step.status} className="relative flex flex-col items-center">
                {/* Connector Line */}
                {index > 0 && (
                  <div
                    className={`absolute right-1/2 top-5 h-0.5 w-full -translate-y-1/2 ${
                      index <= currentStepIndex ? 'bg-primary' : 'bg-border'
                    }`}
                    style={{ width: 'calc(100% + 2rem)', right: '50%', transform: 'translateX(50%)' }}
                  />
                )}

                {/* Step Circle */}
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    status === 'completed'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : status === 'current'
                      ? 'border-primary bg-background text-primary shadow-glow'
                      : 'border-border bg-background text-muted-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Label */}
                <span
                  className={`mt-2 text-center text-xs font-medium ${
                    status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
                  }`}
                >
                  {step.label}
                </span>

                {/* Timestamp */}
                {history && (
                  <span className="mt-1 text-center text-xs text-muted-foreground">
                    {new Date(history.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tracking History */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-4 font-display text-lg font-semibold text-foreground">Tracking History</h4>
        <div className="space-y-4">
          {[...trackingHistory].reverse().map((entry, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-3 w-3 rounded-full ${
                    index === 0 ? 'bg-primary' : 'bg-border'
                  }`}
                />
                {index < trackingHistory.length - 1 && (
                  <div className="h-full w-0.5 bg-border" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="font-medium text-foreground">
                  {steps.find((s) => s.status === entry.status)?.label || entry.status}
                </p>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
