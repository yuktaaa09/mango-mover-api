import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Truck, 
  Clock, 
  Shield, 
  Star,
  Package,
  MapPin,
  Users,
  CheckCircle
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable mango transport with real-time tracking"
    },
    {
      icon: Shield,
      title: "Safe Transport",
      description: "Your mangoes are handled with care by our trained drivers"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "We guarantee timely delivery with live updates"
    },
    {
      icon: Star,
      title: "Quality Service",
      description: "Rated 4.9/5 by our satisfied customers"
    }
  ];

  const stats = [
    { icon: Package, number: "10K+", label: "Orders Delivered" },
    { icon: Users, number: "500+", label: "Happy Customers" },
    { icon: Truck, number: "50+", label: "Professional Drivers" },
    { icon: MapPin, number: "25+", label: "Cities Covered" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Mango Farmer",
      content: "MangoMove has revolutionized how I transport my mangoes to the market. Fast, reliable, and my mangoes arrive fresh!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Restaurant Owner",
      content: "The best mango delivery service! Always on time and the quality is maintained throughout transport.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Retailer",
      content: "Professional drivers, real-time tracking, and excellent customer service. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-warning text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Mango
              <span className="block text-5xl md:text-7xl">Transport Service</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Fresh mangoes delivered safely and quickly to your destination with real-time tracking and professional handling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Package className="mr-2 h-5 w-5" />
                  Order Now
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                  <MapPin className="mr-2 h-5 w-5" />
                  Track Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MangoMove?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best mango transport service with cutting-edge technology and experienced professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Trusted by farmers, retailers, and restaurants across the country</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transport Your Mangoes?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust MangoMove for their mango transport needs
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;