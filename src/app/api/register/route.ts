import { User } from "@/model/user";
import { createNewUser } from "@/queries/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  // Check if the email is already registered
  try {
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This email is already associated with an account. Please use a different email or log in.",
        },
        { status: 400 }
      );
    }
    // Create a new user
    user = await createNewUser({ name, email, password });
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
        error: error,
      },
      { status: 500 }
    );
  }
};
