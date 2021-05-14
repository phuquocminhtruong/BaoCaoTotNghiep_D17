import React ,{useState, useEffect}from 'react'
import { useSelector } from 'react-redux';
import {Card,Row,Col} from 'antd'


const { Meta } = Card;
function News() {
    const newsList = useSelector((state) => state.user_reducer.newslist);
    const [news, setnews] = useState([])
    useEffect(() => {
      //  console.log('asdf')
        if(newsList){
            setnews(newsList)
            console.log(news)
        }
    }, [newsList])

        return (
        
        <div className='container'>
            <div>
            <Row gutter={[16, 16]}>

              {news.length && news.map((news, index) => (
                    <Col span={6}>
                    <a href={news.link} target='blank'>
                        <Card
                            hoverable
                            style={{ width: 260, backgroundColor:'cornsilk' }}
                    
                            cover={<img alt="example" src={news.img} />}
                        >
                            <Meta title={news.title} description={news.source}/>
                        </Card>
                    </a>
               

                </Col>
                ))}
            </Row>
            </div>
        </div>
    )
}

export default News
