import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  MapPin, 
  Truck, 
  Package, 
  CheckCircle,
  Clock,
  Phone,
  User
} from "lucide-react";

const Track = () => {
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data - in real app this would come from Supabase
  const mockTrackingData = {
    orderId: "MNG123456",
    status: "in_transit",
    customerName: "Rajesh Kumar",
    mangoType: "Alphonso",
    quantity: "25kg",
    pickupAddress: "Ratnagiri, Maharashtra",
    dropAddress: "Mumbai Central Market, Mumbai",
    driverName: "Vikram Singh",
    driverPhone: "+91 98765 43210",
    vehicleNumber: "MH 12 AB 1234",
    estimatedDelivery: "Tomorrow, 2:00 PM",
    currentLocation: "Panvel, Mumbai",
    progress: 75,
    timeline: [
      {
        status: "Order Placed",
        description: "Your order has been confirmed",
        timestamp: "Today, 9:00 AM",
        completed: true
      },
      {
        status: "Driver Assigned",
        description: "Vikram Singh has been assigned as your driver",
        timestamp: "Today, 9:30 AM",
        completed: true
      },
      {
        status: "Pickup Completed",
        description: "Mangoes picked up from Ratnagiri",
        timestamp: "Today, 11:00 AM",
        completed: true
      },
      {
        status: "In Transit",
        description: "Currently at Panvel, Mumbai",
        timestamp: "Today, 1:30 PM",
        completed: true,
        current: true
      },
      {
        status: "Out for Delivery",
        description: "Driver is on the way to delivery location",
        timestamp: "Tomorrow, 1:00 PM",
        completed: false
      },
      {
        status: "Delivered",
        description: "Order delivered successfully",
        timestamp: "Tomorrow, 2:00 PM",
        completed: false
      }
    ]
  };

  const handleTrack = async () => {
    if (!orderId.trim()) {
      toast({
        title: "Please enter Order ID",
        description: "Enter your order ID to track your delivery",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (orderId.toLowerCase().includes("mng")) {
        setTrackingData(mockTrackingData);
        toast({
          title: "Order Found!",
          description: "Your order tracking information has been loaded.",
        });
      } else {
        toast({
          title: "Order Not Found",
          description: "Please check your order ID and try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning";
      case "in_transit": return "bg-primary";
      case "delivered": return "bg-success";
      case "cancelled": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Order Pending";
      case "in_transit": return "In Transit";
      case "delivered": return "Delivered";
      case "cancelled": return "Cancelled";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-muted-foreground">
            Enter your order ID to get real-time tracking information
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Order Tracking
            </CardTitle>
            <CardDescription>
              Enter your order ID (e.g., MNG123456) to track your delivery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="orderId" className="sr-only">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="Enter your order ID..."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button onClick={handleTrack} disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Clock className="mr-2 h-5 w-5 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Track Order
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Order Overview */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">Order #{trackingData.orderId}</CardTitle>
                    <CardDescription className="text-base">
                      {trackingData.quantity} of {trackingData.mangoType} mangoes
                    </CardDescription>
                  </div>
                  <Badge 
                    className={`${getStatusColor(trackingData.status)} text-white px-4 py-2 text-sm`}
                  >
                    {getStatusText(trackingData.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">From</p>
                        <p className="text-sm text-muted-foreground">{trackingData.pickupAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-destructive mt-1" />
                      <div>
                        <p className="font-medium">To</p>
                        <p className="text-sm text-muted-foreground">{trackingData.dropAddress}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Driver</p>
                        <p className="text-sm text-muted-foreground">{trackingData.driverName}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Truck className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Vehicle</p>
                        <p className="text-sm text-muted-foreground">{trackingData.vehicleNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Delivery Progress</h3>
                    <span className="text-sm text-muted-foreground">
                      ETA: {trackingData.estimatedDelivery}
                    </span>
                  </div>
                  <Progress value={trackingData.progress} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>Order Placed</span>
                    <span className="font-medium text-primary">
                      Currently at: {trackingData.currentLocation}
                    </span>
                    <span>Delivered</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
                <CardDescription>Track the journey of your mango delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        event.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      } ${event.current ? 'ring-4 ring-primary/20' : ''}`}>
                        {event.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            event.completed ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {event.status}
                            {event.current && (
                              <Badge variant="outline" className="ml-2 text-xs">Current</Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Driver */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Need to contact your driver?</h3>
                    <p className="text-sm text-muted-foreground">
                      {trackingData.driverName} • {trackingData.vehicleNumber}
                    </p>
                  </div>
                  <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Driver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sample Order ID */}
        {!trackingData && (
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Don't have an order yet?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try our sample tracking with order ID: <code className="bg-muted px-2 py-1 rounded">MNG123456</code>
              </p>
              <Button variant="outline" onClick={() => setOrderId("MNG123456")}>
                Try Sample Order
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Track;