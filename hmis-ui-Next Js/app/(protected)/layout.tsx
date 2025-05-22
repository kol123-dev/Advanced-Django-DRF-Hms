import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { OfflineIndicator } from "@/components/offline-indicator";
import { SyncStatusIndicator } from "@/components/sync-status-indicator";
import { ProtectedRoute } from "@/components/protected-route";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header>
            <SyncStatusIndicator />
          </Header>
          <main className="flex-1 overflow-y-auto scrollbar-thin bg-gradient-to-b from-background to-background/95 backdrop-blur-[2px]">
            <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 animate-in fade-in duration-300 min-h-full">
              <div className="rounded-xl border border-border/40 bg-card/30 shadow-sm p-3 sm:p-4 md:p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      <OfflineIndicator />
    </ProtectedRoute>
  );
}
