import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would integrate with Supabase or email service
    // For now, just return success
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process form' },
      { status: 500 }
    );
  }
}
