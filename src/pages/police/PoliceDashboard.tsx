import { useNavigate } from "react-router-dom";
import { AlertTriangle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAccidents, Accident } from "@/context/AccidentContext";

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const { accidents } = useAccidents();

  const activeAccidents = accidents.filter((a) => a.status !== "Resolved").length;
  const respondingUnits = accidents.filter((a) => a.status === "Unit informed").length;

  const getStatusBadge = (status: Accident["status"]) => {
    const variants: Record<Accident["status"], string> = {
      New: "bg-destructive text-destructive-foreground",
      "Unit informed": "bg-yellow-500 text-black",
      Resolved: "bg-success text-success-foreground",
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          🚨 Accident Response System
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-card border-destructive/30">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-full bg-destructive/20">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Active Accidents</p>
              <p className="text-4xl font-bold text-foreground">{activeAccidents}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary/30">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-full bg-primary/20">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Responding Units</p>
              <p className="text-4xl font-bold text-foreground">{respondingUnits}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accident List */}
      <Card>
        <CardHeader>
          <CardTitle>Accident List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accidents.map((accident) => (
                <TableRow
                  key={accident.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => navigate(`/police/accident/${accident.id}`)}
                >
                  <TableCell className="font-medium">{accident.id}</TableCell>
                  <TableCell>{accident.time}</TableCell>
                  <TableCell>{accident.location}</TableCell>
                  <TableCell>{getStatusBadge(accident.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoliceDashboard;
