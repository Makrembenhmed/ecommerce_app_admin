import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Settings() {
    const router=useRouter()

    const { data: session } = useSession()

    async function LogOut(){
        await router.push('/'),
        await signOut()
    }
    if (session) {
        return (
            <>

                <header>
                    <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="text-center sm:text-left">
                                

                                <div className="sm:flex sm:gap-4 my-4 flex gap-4 items-center">
                                    <div class="h-10 w-10">
                                        <img className="h-full w-full rounded-full object-cover object-center" src={session.user.image} alt="" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">{session.user.name} </h1>
                                </div>

                                <p className="mt-1.5 text-md text-gray-500 px-4 max-w-lg"> {session.user.email} </p>
                                
                            </div>

                            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                                <button
                                    className="inline-flex items-center justify-center gap-1.5 rounded border border-red-600 px-12 py-3 text-sm font-medium
                                    text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring
                                     active:bg-red-500 w-full"
                                    onClick={LogOut}
                                >
                                    <span className="text-md font-medium"> LogOut </span>

                                    
                                </button>


                            </div>
                        </div>
                    </div>
                </header>


            </>
        )

    } 

}
