import express from 'express';
import axios from 'axios'
import cheerio from 'cheerio'
const router = express.Router();


const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}


export const getNews = async (req, res) => { 
    try{
        
        const url = "https://news.google.com/search?q=bds&hl=vi&gl=VN&ceid=VN%3Avi";

        const content = await fetchData(url)
        const $ =cheerio.load(content)
        const news=[]
        var totalnews=0
        $('.NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc').each((i,e)=>{
            const title = $(e).find('h3 >.DY5T1d').text();
            const source = $(e).find('.wEwyrc').text().trim();
            const time =  $(e).find('.WW6dff').attr('datetime');
            const description = $(e).find('.xBbh9').text();
            const link = 'https://news.google.com/' + $(e).find('.VDXfz').attr("href") +'\n';
            const img =$(e).find('img.tvs3Id.QwxBBf').attr("src")+'\n';
            let oneNews ={
                description:description,
                link:link,
                source:source,
                time:time,
                img:img,
                title:title
            }
            news.push(oneNews)
            totalnews++;
        })
        res.json(news)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    } 
}

export default router;