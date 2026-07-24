import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Cart is client-persisted via localStorage. Use client-side CartContext to manage cart state.',
    supported: ['GET (return current message)', 'POST (add item)', 'PATCH (update quantity)', 'DELETE (remove item)'],
    note: 'Cart items are stored in localStorage on the client. When the user creates an order, POST to /api/orders with the cart items.',
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.productId || !body.quantity) {
      return NextResponse.json(
        { error: 'productId and quantity are required' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Cart is client-persisted. This endpoint is for reference only. Use POST /api/orders to create an order from cart items.',
      item: body,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
