import  express  from "express";

const app = express();

const PORT = 3000;

import puppeteer from "puppeteer";



const fun=async(req,res)=>{
    try {
        //Making the browser and launching a page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
    
        //going to a website 
        await page.goto("https://www.hindustantimes.com/",{
            waitUntil:"domcontentloaded",
        });
        
        //selecting the div which has the top news
        const title = await page.$$eval('.hdg3 a',(element)=>{
            
            let quotesArray = [];
            element.map((e)=>{
                let text = e.textContent;
                let link = e.href;
                quotesArray.push({
                    News:text,
                    Link:link
    
                })
            })
            return quotesArray;
        });
    
    
        // console.log(title);
    
        //closing the browser
        await browser.close();
        // console.log("Chala yha tak")
        return res.status(200).json({
            status:true,
            message:" Data has been fetched sucessfully",
            data:title
            
            
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status:false,
            message:" Error while fetching the data",
            Error:error
            
            
        })

    }
   
   
}

app.use(express.json())

app.use("/api/news",fun)

app.listen(PORT,()=>{
    console.log("run ho rha hai PORT ",PORT)
})