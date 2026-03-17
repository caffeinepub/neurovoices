import type { Subscriber } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { Brain, Lock, Users } from "lucide-react";
import { useState } from "react";

function formatTimestamp(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AdminPage() {
  const { actor } = useActor();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    setError("");
    try {
      const result = await actor.getSubscribers(password);
      setSubscribers(result);
    } catch {
      setError("Invalid password or unable to fetch subscribers.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                Admin access
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Subscriber List
              </h1>
            </div>
          </div>

          {subscribers === null ? (
            <div className="max-w-sm">
              <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                  Enter admin password
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  This page is private. Enter the password to view subscriber
                  data.
                </p>
                <form
                  onSubmit={handleLogin}
                  className="space-y-4"
                  data-ocid="admin.panel"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      data-ocid="admin.input"
                    />
                  </div>
                  {error && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="admin.error_state"
                    >
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={loading || !password}
                    className="w-full"
                    data-ocid="admin.submit_button"
                  >
                    {loading ? "Verifying..." : "Access admin"}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div data-ocid="admin.table">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Users className="w-4 h-4" />
                  {subscribers.length} subscriber
                  {subscribers.length !== 1 ? "s" : ""}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSubscribers(null);
                    setPassword("");
                  }}
                  className="text-muted-foreground"
                >
                  Sign out
                </Button>
              </div>

              {subscribers.length === 0 ? (
                <div
                  className="rounded-2xl bg-card border border-border p-12 text-center"
                  data-ocid="admin.empty_state"
                >
                  <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No subscribers yet.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-soft">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="font-semibold text-foreground">
                          #
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-foreground">
                          Date Joined
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((sub, i) => (
                        <TableRow
                          key={`${sub.email}-${i}`}
                          data-ocid={`admin.row.item.${i + 1}`}
                        >
                          <TableCell className="text-muted-foreground text-sm">
                            {i + 1}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {sub.name || (
                              <span className="text-muted-foreground italic">
                                Anonymous
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {sub.email}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {formatTimestamp(sub.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
