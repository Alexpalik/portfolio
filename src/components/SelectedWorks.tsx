import React from 'react'
import GridBox from './GridBox'
import Image from 'next/image'

const gridBoxes = [
    {
        src: "/gemini1.png",
        alt: "Gemini 1",
        number: 1
    },
    null, // Empty space
    {
        src: "/gemini4.png",
        alt: "Gemini 4",
        number: 2
    },
    null, // Empty space
    null, // Empty space
    {
        src: "/gemini3.png",
        alt: "Gemini 3",
        number: 3
    },
    null, // Empty space
    null, // Empty space
    null, // Empty space
    null, // Empty space
    null, // Empty space
    {
        src: "/gemini2.png",
        alt: "Gemini 2",
        number: 4
    }
]

const SelectedWorks = () => {
  return (
    <>
     <div className="flex flex-col gap-4 items-left min-h-screen w-full">
        <div className="flex flex-col gap-30">
            <div>
                <div>
                    <h2 className="text-lg font-regular mb-4"
                    style={{color: "rgb(84, 98, 90)"}}>Featured projects:11
                    </h2>
                </div>
                <div>
                    <h2 className="text-5xl font-regular max-w-2xl"
                    style={{color:"rgb(84, 98, 90)"}}>Selection of projects highlighting
                    diverse skills in development.</h2>
                </div>
            </div>
        
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full">
                {
                    gridBoxes.map((box,index ) => {
                        return box ? (
                            <GridBox key={index} src={box.src} alt={box.alt} number={box.number}/>
                        ) : (
                            <div key={index} className="md:block hidden"></div>
                        )
                    })
                }
            </div>
        </div>

     </div>
     <div className="">
        

     </div>
    </>
    
  )
}

export default SelectedWorks