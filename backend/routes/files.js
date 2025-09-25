router.post('/presign',async(req,res)=>{
    try {
        const {filename, contentType}=req.body
        if(!filename || !contentType){
            return res.status(400).json({message:"filename/contentType은 필수 입니다."})
        }

        const key =`uploads/${Date.now()}-${nanoid(6)}-${filename}`

        const url = await presignPut(key,contentType)

        res.json({url,key})

    } catch (error) {
        console.error(error)
        res.status(500).json({error:"프리사인드 url 생성 실패"})
    }
})
