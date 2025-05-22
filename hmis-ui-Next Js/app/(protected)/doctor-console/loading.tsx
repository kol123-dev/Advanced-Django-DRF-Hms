import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DoctorConsoleLoading() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px] mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px]" />
                <Skeleton className="h-4 w-[100px] mt-1" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-[600px]" />

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between mb-4">
              <div className="flex gap-2">
                <Skeleton className="h-9 w-[60px]" />
                <Skeleton className="h-9 w-[120px]" />
                <Skeleton className="h-9 w-[120px]" />
              </div>
              <Skeleton className="h-9 w-[200px]" />
            </div>

            <div className="space-y-4">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div>
                            <Skeleton className="h-5 w-[120px]" />
                            <Skeleton className="h-4 w-[150px] mt-1" />
                            <div className="flex gap-2 mt-2">
                              <Skeleton className="h-5 w-[100px]" />
                              <Skeleton className="h-5 w-[80px]" />
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-4 w-[80px]" />
                          <Skeleton className="h-4 w-[100px] mt-1" />
                          <Skeleton className="h-9 w-[150px] mt-2" />
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
