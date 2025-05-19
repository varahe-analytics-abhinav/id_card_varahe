import { Box, Card, CardContent, Typography } from "@mui/material";
import moment from "moment/moment";

export default function Blogdetail({blog}){
    // console.log(blog)
 return <>
<Card variant="outlined"  sx={{ minWidth: 700 }}>
<Box sx={{ display: 'flex', flexDirection: 'row', pl: 3, pr: 3 }} >
        <div className="col-6">
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Title
          </Typography>
          <Typography component="div" variant="p">
            {blog? blog.title : ""}
          </Typography>
        </div>
        <br></br>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Author
          </Typography>
          <Typography component="div" variant="p">
            {blog? blog.author : ''}
          </Typography>
        </CardContent>

      </Box>
<Box sx={{ display: 'flex', flexDirection: 'row', pl: 3, pr: 3 }} >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Tags
          </Typography>
          <Typography component="div" variant="p">
            {blog? blog.tags.map((e,i)=>{
           return e
            }):""}
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Meta Title
          </Typography>
          <Typography component="div" variant="p">
            {blog? blog.metaTitle:""}
          </Typography>
        </CardContent>

      </Box>
<Box sx={{ display: 'flex', flexDirection: 'row', pl: 3, pr: 3  }}>

        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary" component="div" >
          isPublished
          </Typography>
          <Typography component="div" variant="p" width={"100px"}>
           {blog ? blog.isPublished ? "true" : "false" : ""}
          </Typography>
          
        </CardContent>
        <div className="col-6">
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Meta Description
          </Typography>
          <Typography component="div" variant="p">
            {blog? blog.metaDescription : ""}
          </Typography>
        </div>
      </Box>
<Box sx={{ display: 'flex', flexDirection: 'row' , pl: 3, pr: 3 }}>
      
      
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          created At
          </Typography>
          <Typography component="div" variant="p">
            {blog ? moment(blog.createdAt).format("YYYY/MM/DD"):""}
          </Typography>
        </CardContent>

     
      </Box>
<Box sx={{ display: 'flex', flexDirection: 'row' , pl: 3, pr: 3 }}>
      
<div className="col-12">
          <Typography variant="subtitle1" color="text.secondary" component="div">
          Content
          </Typography>
          <Typography component="div" variant="p">
            {blog ? blog.content : ""}
          </Typography>
        </div>
     
      </Box>

<Box sx={{ display: 'flex', flexDirection: 'row' , pl: 3, pr: 3 }}>
       
        <CardContent sx={{ flex: '1 0 auto' }}>
         
          <button
                  className="btn btn-primary"
               
                  data-dismiss="modal"
                >Ok  <i className="fa fa-check"></i>
                </button>
        </CardContent>

      </Box>
</Card>
 </>
}