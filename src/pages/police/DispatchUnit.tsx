import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Unit {
  id: string;
  name: string;
  distance: string;
  phone: string;
}

const availableUnits: Unit[] = [
  { id: "A", name: "Unit A", distance: "2 km away", phone: "+250 788 123 456" },
  { id: "B", name: "Unit B", distance: "4 km away", phone: "+250 788 789 012" },
  { id: "C", name: "Unit C", distance: "6 km away", phone: "+250 788 345 678" },
];

const DispatchUnit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleDispatch = (unit: Unit) => {
    toast({
      title: "Unit Dispatched",
      description: `${unit.name} has been dispatched to the accident location.`,
    });
    navigate(`/police/accident/${id}`);
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\s/g, "")}`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(`/police/accident/${id}`)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Accident Details
      </Button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Car className="h-7 w-7 text-primary" />
          Available Units
        </h1>
        <p className="text-muted-foreground mt-2">
          Select a unit to dispatch to the accident location
        </p>
      </div>

      {/* Units List */}
      <div className="space-y-4">
        {availableUnits.map((unit) => (
          <Card key={unit.id} className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{unit.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{unit.distance}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-foreground font-mono">{unit.phone}</span>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => handleDispatch(unit)}
                >
                  Dispatch Unit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleCall(unit.phone)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DispatchUnit;
