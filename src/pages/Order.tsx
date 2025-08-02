import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  MapPin, 
  Truck, 
  CreditCard,
  Clock,
  CheckCircle
} from "lucide-react";

const Order = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    pickupAddress: "",
    dropAddress: "",
    mangoType: "",
    quantity: "",
    deliveryType: "standard",
    specialInstructions: "",
    contactPhone: ""
  });

  const mangoTypes = [
    { value: "alphonso", label: "Alphonso", price: 800 },
    { value: "kesar", label: "Kesar", price: 600 },
    { value: "dasheri", label: "Dasheri", price: 500 },
    { value: "langra", label: "Langra", price: 450 },
    { value: "chausa", label: "Chausa", price: 550 },
    { value: "totapuri", label: "Totapuri", price: 400 }
  ];

  const deliveryTypes = [
    { 
      value: "standard", 
      label: "Standard Delivery", 
      description: "2-3 days delivery",
      price: 0,
      icon: Truck
    },
    { 
      value: "express", 
      label: "Express Delivery", 
      description: "Next day delivery",
      price: 100,
      icon: Clock
    },
    { 
      value: "premium", 
      label: "Premium Care", 
      description: "Same day, temperature controlled",
      price: 250,
      icon: CheckCircle
    }
  ];

  const selectedMango = mangoTypes.find(m => m.value === formData.mangoType);
  const selectedDelivery = deliveryTypes.find(d => d.value === formData.deliveryType);
  const quantity = parseFloat(formData.quantity) || 0;
  const subtotal = selectedMango ? selectedMango.price * quantity : 0;
  const deliveryCharge = selectedDelivery ? selectedDelivery.price : 0;
  const total = subtotal + deliveryCharge;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickupAddress || !formData.dropAddress || !formData.mangoType || !formData.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with Supabase to save the order
    toast({
      title: "Order Placed Successfully!",
      description: `Your order for ${quantity}kg of ${selectedMango?.label} mangoes has been placed. Order ID: #MNG${Date.now().toString().slice(-6)}`,
    });

    // Reset form
    setFormData({
      pickupAddress: "",
      dropAddress: "",
      mangoType: "",
      quantity: "",
      deliveryType: "standard",
      specialInstructions: "",
      contactPhone: ""
    });
  };

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Place Your Mango Order</h1>
          <p className="text-xl text-muted-foreground">
            Fresh mangoes delivered safely to your destination
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order Details
                </CardTitle>
                <CardDescription>
                  Fill in the details for your mango transport order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Pickup and Drop Addresses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Address *</Label>
                      <Textarea
                        id="pickup"
                        placeholder="Enter pickup address..."
                        value={formData.pickupAddress}
                        onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="drop">Drop Address *</Label>
                      <Textarea
                        id="drop"
                        placeholder="Enter delivery address..."
                        value={formData.dropAddress}
                        onChange={(e) => handleInputChange("dropAddress", e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>

                  {/* Mango Type and Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Mango Type *</Label>
                      <Select value={formData.mangoType} onValueChange={(value) => handleInputChange("mangoType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mango type" />
                        </SelectTrigger>
                        <SelectContent>
                          {mangoTypes.map(mango => (
                            <SelectItem key={mango.value} value={mango.value}>
                              {mango.label} - ₹{mango.price}/kg
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (kg) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        step="0.5"
                        placeholder="e.g., 10"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Contact Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your contact number"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    />
                  </div>

                  {/* Delivery Type */}
                  <div className="space-y-4">
                    <Label>Delivery Type</Label>
                    <RadioGroup 
                      value={formData.deliveryType} 
                      onValueChange={(value) => handleInputChange("deliveryType", value)}
                    >
                      {deliveryTypes.map(delivery => {
                        const Icon = delivery.icon;
                        return (
                          <div key={delivery.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                            <RadioGroupItem value={delivery.value} id={delivery.value} />
                            <div className="flex items-center flex-1">
                              <Icon className="h-5 w-5 mr-3 text-primary" />
                              <div className="flex-1">
                                <Label htmlFor={delivery.value} className="text-base font-medium cursor-pointer">
                                  {delivery.label}
                                </Label>
                                <p className="text-sm text-muted-foreground">{delivery.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  {delivery.price === 0 ? "Free" : `+₹${delivery.price}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special handling requirements..."
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMango && quantity > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>{selectedMango.label} ({quantity}kg)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery ({selectedDelivery?.label})</span>
                      <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                )}
                
                {(!selectedMango || quantity === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select mango type and quantity to see pricing</p>
                  </div>
                )}

                <Button 
                  onClick={handleSubmit}
                  className="w-full" 
                  size="lg"
                  disabled={!selectedMango || quantity === 0}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Place Order
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Payment will be collected upon delivery
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;