import { connectToDB } from "@utils/database";
import User from '@models/user';

export const PATCH = async (request, { params }) => {
    let { userId, receiptId, amountToRefund } = await request.json();

    try {
        await connectToDB();
        const user = await User.findById(userId);
        
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        let removedTickets = [];
        try{
            for (let i = 0; i < user.receipts.length; i++) {
                if(user.receipts[i]._id.toString() === receiptId.toString()){
                    let receipt = user.receipts[i];
                    for (let j = receipt.tickets.length - 1; j >= 0; j--) {
                        if(amountToRefund > 0) {
                            removedTickets.push(receipt.tickets[j])
                            receipt.tickets.splice(j,1);
                            amountToRefund -=1;
                            continue;
                        } 
                        break;
                    }
                    if(receipt.tickets.length > 0){
                        user.receipts[i] = receipt;
                    } else {
                        user.receipts.splice(i,1);
                    }
                    await user.save();
                    return new Response(JSON.stringify(removedTickets), { status: 200 });
                }
            }
        } catch(error) {
            console.log(error)
        }
        
        return new Response(JSON.stringify("The winning receipt was not found"), { status: 500 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating User", { status: 500 });
    }
};