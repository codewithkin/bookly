import { PrismaClient } from "@/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const userId = "aFrKZg4bkUjra2VaOCx6n6UdOoVOM6Sv";

  // Create 15 services
  const services = await Promise.all(
    Array.from({ length: 15 }).map(() =>
      prisma.service.create({
        data: {
          userId,
          name: faker.person.jobTitle(),
          description: faker.lorem.sentence(),
          duration: faker.number.int({ min: 30, max: 90 }),
          price: parseFloat(faker.commerce.price({ min: 20, max: 150 })),
        },
      }),
    ),
  );

  // Create 15 clients
  const clients = await Promise.all(
    Array.from({ length: 15 }).map(() =>
      prisma.client.create({
        data: {
          userId,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          notes: faker.lorem.sentence(),
        },
      }),
    ),
  );

  // Create 15 appointments
  const appointments = await Promise.all(
    Array.from({ length: 15 }).map(() => {
      const service = faker.helpers.arrayElement(services);
      const client = faker.helpers.arrayElement(clients);

      return prisma.appointment.create({
        data: {
          userId,
          clientId: client.id,
          serviceId: service.id,
          clientName: client.name,
          service: service.name,
          date: faker.date.soon({ days: 30 }),
          status: faker.helpers.arrayElement([
            "confirmed",
            "pending",
            "cancelled",
          ]),
        },
      });
    }),
  );

  // Create 15 availabilities
  await Promise.all(
    Array.from({ length: 15 }).map(() =>
      prisma.availability.create({
        data: {
          userId,
          dayOfWeek: faker.number.int({ min: 0, max: 6 }),
          startTime: "09:00",
          endTime: "17:00",
        },
      }),
    ),
  );

  // Create 15 notifications
  await Promise.all(
    Array.from({ length: 15 }).map(() => {
      const appointment = faker.helpers.arrayElement(appointments);
      return prisma.notification.create({
        data: {
          userId,
          appointmentId: appointment.id,
          type: faker.helpers.arrayElement(["email", "sms"]),
          status: faker.helpers.arrayElement(["pending", "sent", "failed"]),
          scheduledAt: faker.date.future({ years: 0.1 }),
        },
      });
    }),
  );

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
