import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Spinner from './Spinner'
import { sortable } from 'react-sortablejs';

export default function Product() {
  const router = useRouter()

  const [redirect, setRedirect] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [images, setImages] = useState([])
  const [isuploading, setIsUploading] = useState(false)


  const uploadImagesQueue = []
  async function createProduct(e) {
    e.preventDefault();
    if (isuploading) {
      await Promise.all(uploadImagesQueue)
    }
    const data = { title, description, price, images }
    await axios.post("/api/products", data)
    setRedirect(true)
  }
  async function uploadImages(e) {

    const files = e.target?.files
    if (files?.length > 0) {
      setIsUploading(true)
      for (const file of files) {

        const data = new FormData();
        data.append('file', file)
        uploadImagesQueue.push(
          axios.post('/api/upload', data).then(res => { setImages(oldImages => [...oldImages, ...res.data.links]) })
        )
      }
      await Promise.all(uploadImagesQueue)
      setIsUploading(false)
    } else {
      return ('an error occured')
    }
  }
  if (redirect) {
    router.push('/products')
    return null
  }
  function updateImageOrder(Images) {
    setImages(Images)

  }
function handeleDeleteImage(index){
  const updateImages=[...images]
  updateImages.splice(index,1)
  setImages(updateImages)

}
  return (
    <>


      <form onSubmit={createProduct} className='mx-auto my-4 max-w-screen-sm '>

        <div className="mx-auto my-4 ">
          <div>
            <label for="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">
              Title</label>
            <input type="text" id="example1" className=" bg-gray-200 block w-full rounded-md
     border-gray-300 shadow-sm focus:border-primary-400 focus:ring 
     focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-green-400 
      disabled:text-gray-500" placeholder="product Tittle"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
        </div>


        <div className="mx-auto my-4 ">
          <div>
            <label for="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">
              Select Category</label>


            <select id="example1" className="  bg-gray-200 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
              <option value="">No category selected</option>
              <option value="">Option02</option>
              <option value="">Option03</option>
            </select>
          </div>
        </div>


        <div className="mx-auto my-4 ">


          <div className="mx-auto ">
            <label for="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">Images</label>

            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-blue-200 p-6 transition-all hover:border-primary-300">
              <div className="space-y-1 text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                    <path stroke-linecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>
                <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
                <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
              <input id="fileInput" type="file" className="hidden" accept='image/*' onClick={uploadImages} />
            </label>
          </div>



        </div>
        <div className="grid grid-cols-2 items-center rounded">

          {isuploading && (<Spinner className="mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />)}
        </div>

        {!isuploading && (
          <div className='grid grid-cols-2 gap-4 '>
            <reactSortable list={Array.isArray(images) ? images : []}
              setList={updateImageOrder}
              animation='200'
              className='gid grid-cols-2 gap-4'
            >
              {Array.isArray(images) && images.map((link, index) => (
                <div key={link} className="relative group ">

                  <img src={link} alt="image" className="object-cover h-32 w-44 rounded-md p-2 " />
                  <div className='absolute top-2 right-2 cursor-pointer group-hover:opacity-100 '>
                    <button onClick={() => handeleDeleteImage(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg"
                       fill="none" 
                       viewBox="0 0 24 24" 
                       stroke-width="1.5"
                        stroke="currentColor" 
                        class="w-6 h-6 text-orange-600 bg-white rounded-full">

                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>


                    </button>
                  </div>
                </div>

              ))}
            </reactSortable> </div>
        )}


        <div className="mx-auto my-4 ">
          <label for="example1" className="mb-1  block text-lg font-medium text-gray-700 py-1">
            Description </label>
          <div>
            <textarea rows={5} id="example1" className="block w-full  bg-gray-200 rounded-md
     border-gray-300 shadow-sm focus:border-primary-400 focus:ring 
     focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
      disabled:text-gray-500" placeholder="product Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>


        <div className="mx-auto my-4 ">
          <div>
            <label for="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">
              Price </label>
            <input type="number" id="example1" className="block w-full  bg-gray-200 rounded-md
     border-gray-300 shadow-sm focus:border-primary-400 focus:ring 
     focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
      disabled:text-gray-500" placeholder="product price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
        </div>


        <div className="mx-auto my-4 ">
          <button type='submit'
            className="inline-block rounded border border-green-600 px-12 py-3 text-sm font-medium
             text-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring
              active:bg-green-500 w-full"

          >
            Save Product
          </button>
        </div>


      </form>
    </>

  )
}
