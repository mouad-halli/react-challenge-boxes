import React, { Children, useState } from 'react'

function App() {

	const [boxes, setBoxes] = useState<string[]>(['template'])

	const handleEnter = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, boxeIdx: number) => {
	/*	
		The EventTarget type does not inherit from the Element type,
		TypeScript will fail to recognize innerHTML propertie.
		TypeScript Type Assertion (as) tells the compiler to treat something as a type
	*/
		(e.target as Element).innerHTML = 'CLICK HERE'

		const boxesCopy = [...boxes]
		boxesCopy.splice(boxeIdx + 1, 0, 'template')
		setBoxes(boxesCopy)
	}

	const handleExit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		(e.target as Element).innerHTML = 'HOVER HERE'
	
		const boxesCopy = [...boxes]
		const templateIndex = boxesCopy.indexOf('template')
		if (templateIndex > -1) {
			boxesCopy.splice(templateIndex, 1)
			setBoxes(boxesCopy)
		}
	}

	const handleCreateBox = (boxeIdx: number) => {
		const boxesCopy = [...boxes]
		boxesCopy[boxeIdx] = 'CLICK HERE'
		setBoxes(boxesCopy)
	}

	const handleBoxContentChange = (e: React.ChangeEvent<HTMLInputElement>, boxIndex: number) => {
		const newValue = e.target.value
	
		if (newValue !== 'template')
			setBoxes(prevState => [prevState[boxIndex] = e.target.value])
	}

	return (
		<div className=" h-screen w-screen flex justify-center items-center bg-black">
			<div className=' h-4/6 w-4/6 flex flex-col flex-wrap lg:flex-row p-10 gap-5 border-2 border-dashed'>
			{Children.toArray(boxes.map((box: string, idx: number) => (
				box === 'template' ?
				<div
					className='w-32 h-32 flex justify-center items-center border-2 border-dashed border-slate-500 text-slate-500 cursor-pointer '
					onClick={() => handleCreateBox(idx)}
				>
					<span>template</span>
				</div>
				:
				<div className='relative w-32 h-32 flex justify-center items-center ring-2 ring-white text-white  '>
					<input className='w-full mx-2 text-center bg-black' value={box} onChange={(e) => handleBoxContentChange(e, idx)} />
					{(boxes.length < 2 ? true : idx < boxes.length - 1) &&
						<span
							className='h-4 w-32 absolute top-full lg:top-14 lg:left-[60%] lg:rotate-90 text-center text-sm text-slate-500 cursor-pointer'
							onMouseEnter={(e) => handleEnter(e, idx)} onMouseLeave={(e) => handleExit(e)} onClick={(e) => handleCreateBox(idx + 1)}
						>
						HOVER HERE</span>
					}
				</div>
			)))}
			</div>
		</div>
	)
}

export default App
