import { NextResponse } from 'next/server';

export async function GET() {
  // Instagram Basic Display API endpoint
  // To use this, you need to set up:
  // 1. Instagram Basic Display app at https://developers.facebook.com/
  // 2. Get an access token
  // 3. Set INSTAGRAM_ACCESS_TOKEN in environment variables
  
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  if (!accessToken) {
    // Return placeholder data if no token is configured
    return NextResponse.json({ 
      data: [],
      message: 'Instagram API not configured. Add INSTAGRAM_ACCESS_TOKEN to your environment variables.' 
    });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${accessToken}&limit=9`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram posts');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json({ 
      data: [],
      error: 'Failed to fetch Instagram posts' 
    }, { status: 500 });
  }
}
