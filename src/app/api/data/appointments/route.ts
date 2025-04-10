import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "../../../../lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get the user's session data
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const id = session?.user.id;

    // Get the user's data
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        appointments: true,
      },
    });

    return NextResponse.json({
      appointments: data?.appointments,
    });
  } catch (e) {
    console.log("An error occured while getting user bookings: ", e);

    return NextResponse.json(
      {
        success: false,
        message: "An error occured while getting user bookings",
      },
      { status: 500 },
    );
  }
}
