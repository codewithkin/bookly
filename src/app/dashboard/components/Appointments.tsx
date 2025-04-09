import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Appointment } from '@/generated/prisma'
import {format} from "date-fns";

function Appointments({appointments}: {appointments: any}) {
    // Sort the appointments by date and time in descending order
    // and then take the first 5 elements
    appointments = appointments
        .sort((a: Appointment, b: Appointment) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            // If the dates are the same, sort by time
            if (dateA.getDate() === dateB.getDate() && dateA.getMonth() === dateB.getMonth() && dateA.getFullYear() === dateB.getFullYear()) {
                return dateB.getTime() - dateA.getTime();
            }

            // Otherwise, sort by date
            return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 5);

  return (
    <Card className='md:col-span-1 flex flex-col justify-between'>
        <CardHeader>
            <CardTitle>
                Latest Appointments
            </CardTitle>
        </CardHeader>
      
      {/* Appointments map */}
      <CardContent className='flex flex-col gap-4'>
        {
            appointments.map((appointment: Appointment) => (
                <article className="flex justify-between items-center">
              <article className="flex gap-2 items-c">
                      {/* Person avatar */}
                      <Avatar className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-primary">
            <AvatarFallback>
              {appointment.clientName.charAt(0)}
            </AvatarFallback>
            <AvatarImage
              alt={`${appointment.clientName}'s profile picture`}
              src={appointment.clientName || ""}
            />
          </Avatar>

          <article className="flex flex-col items-center">
            <h3 className="text-xl font-medium">
                {appointment.clientName}
            </h3>
            <p className="text-slate-500">
                {appointment.service}
            </p>
          </article>
              </article>

          <Badge variant="secondary" className="text-sm font-medium">
            {format(appointment.date, "dd/MM/yyyy")}
          </Badge>
                </article>
            ))
        }
        </CardContent>

      <CardFooter>
        <p className="text-slate-500">Please don't forget to show up !</p>
      </CardFooter>
    </Card>
  )
}

export default Appointments
