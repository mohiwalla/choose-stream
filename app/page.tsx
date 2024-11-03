"use client"

import { questions } from "@/app/config/chosse-stream-questions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FormEvent, useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, ChevronLeft, ChevronRight, Save, Share2 } from "lucide-react"

export default function Enroll() {
	const [userData, setUserData] = useState({
		name: "",
		ePunjabID: "",
		phone: ""
	})
	const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h"]
	const [currentSection, setCurrentSection] = useState(0)
	const [saved, setSaved] = useState(false)
	const [checkboxes, setCheckboxes] = useState(new Array(questions.flat(Infinity).map((question: any) => question.options)
		.flat(Infinity).length).fill(false))
	const streams = [
		"Health & Medicine",
		"Agriculture & Sciences",
		"Arts & Communication",
		"Engineering & Technology",
		"Buniness & Management",
		"Public Service",
	]

	const marks = [
		checkboxes.slice(0, optionCountTillSection(0, 1)).filter((checkbox) => checkbox).length,
		checkboxes.slice(optionCountTillSection(0, 1), optionCountTillSection(0, 2)).filter((checkbox) => checkbox).length,
		checkboxes.slice(optionCountTillSection(0, 2), optionCountTillSection(0, 3)).filter((checkbox) => checkbox).length,
		checkboxes.slice(optionCountTillSection(0, 3), optionCountTillSection(0, 4)).filter((checkbox) => checkbox).length,
		checkboxes.slice(optionCountTillSection(0, 4), optionCountTillSection(0, 5)).filter((checkbox) => checkbox).length,
		checkboxes.slice(optionCountTillSection(0, 5), optionCountTillSection(0, 6)).filter((checkbox) => checkbox).length,
	]

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		if (currentSection < 7) {
			return changeSection(currentSection + 1)
		}

		if (!saved) {
			const formData = new FormData()
			
			formData.append("name", userData.name)
			formData.append("ePunjabID", userData.ePunjabID)
			formData.append("phone", userData.phone)
			formData.append("marks", checkboxes.map(checkbox => checkbox ? 1 : 0).join())

			setSaved(true)
			await fetch("/api/choose-stream", {
				method: "post",
				body: JSON.stringify(Object.fromEntries(formData))
			})
		}
	}

	function changeSection(sectionID: number) {
		scrollTo({
			top: 0,
			behavior: "smooth",
		})

		setCurrentSection(sectionID)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-auto mt-6 mb-10 w-11/12 md:w-5/6 p-8 border border-gray-300 dark:border-gray-800 rounded-3xl shadow-[rgba(50,50,93,0.6)_0px_50px_100px_-20px,rgba(0,0,0,0.6)_0px_30px_60px_-30px] flex flex-col gap-8 max-w-md"
		>
			{currentSection == 0 && (
				<>
					<h3 className="text-2xl font-bold dark:text-white flex items-center">
						Choose your stream wisely
					</h3>

					<div className="flex flex-col gap-4">
						<Label htmlFor="name">
							Name
							<span className="text-destructive font-black">*</span>
						</Label>

						<Input
							className="text-sm"
							name="name"
							required
							autoComplete="name"
							id="name"
							value={userData.name}
							onChange={e => setUserData({
								...userData,
								name: e.currentTarget.value
							})}
							type="text"
							autoFocus
							autoCapitalize="words"
							placeholder="What shall we call you?"
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Label htmlFor="ePunjabID">
							ePunjab ID<span className="text-destructive font-black">*</span>
						</Label>

						<Input
							className="text-sm"
							required
							type="text"
							id="ePunjabID"
							name="ePunjabID"
							value={userData.ePunjabID}
							onChange={e => setUserData({
								...userData,
								ePunjabID: e.currentTarget.value
							})}
							inputMode="numeric"
							placeholder="2024xxxxxxxx"
						/>
					</div>

					<div className="flex flex-col gap-4">
						<Label htmlFor="phone">
							Phone number
							<span className="text-destructive font-black">*</span>
						</Label>

						<Input
							className="text-sm"
							name="phone"
							required
							minLength={10}
							maxLength={10}
							autoComplete="phone"
							id="phone"
							value={userData.phone}
							onChange={e => setUserData({
								...userData,
								phone: e.currentTarget.value
							})}
							type="text"
							inputMode="numeric"
							placeholder="98xxxxxxxxx1"
						/>
					</div>

					<div className="flex justify-end">
						<Button>
							Start
							<ChevronRight />
						</Button>
					</div>
				</>
			)}

			{[1, 2, 3, 4, 5, 6].includes(currentSection) && (
				<>
					<h3 className="text-2xl font-bold dark:text-white flex items-center">
						Section - {alphabets[currentSection - 1].toUpperCase()}
					</h3>

					{questions[currentSection - 1].map(
						({ question, options }, questionIndex) => {
							return (
								<div
									className="flex flex-col gap-4"
									key={`questions-${currentSection}-${questionIndex}`}
								>
									<Label
										htmlFor={`questions-${currentSection}-${questionIndex}`}
									>
										<div className="flex gap-2">
											<span>{questionIndex + 1}.</span> {question}
										</div>

										<div className="mt-4">
											{options.map((option, optionIndex) => {
												return (
													<label
														className="flex gap-2 py-1"
														htmlFor={`questions-${currentSection}-${questionIndex}-${optionIndex}`}
														key={`questions-${currentSection}-${questionIndex}-${optionIndex}`}
													>
														<span className="font-mono">
															{alphabets[optionIndex]}.
														</span>
														<Checkbox
															id={`questions-${currentSection}-${questionIndex}-${optionIndex}`}
															className="rounded transition-all duration-100"
															checked={
																checkboxes[
																	optionCountTillSection(0, currentSection - 1) +
																		questions[currentSection - 1]
																			.slice(0, questionIndex)
																			.map((question) => question.options)
																			.flat(Infinity).length +
																		optionIndex
																]
															}
															onCheckedChange={(isChecked) => {
																const index = optionCountTillSection(0, currentSection - 1) +
																	questions[currentSection - 1]
																		.slice(0, questionIndex)
																		.map((question) => question.options)
																		.flat(Infinity).length +
																	optionIndex

																const newCheckboxes = [...checkboxes]
																newCheckboxes[index] = isChecked
																setCheckboxes(newCheckboxes)
															}}
														/>

														<span className="flex-grow">{option}</span>
													</label>
												)
											})}
										</div>
									</Label>
								</div>
							)
						}
					)}

					<div className="flex justify-between items-center">
						<Button
							type="button"
							variant="outline"
							onClick={() => changeSection(currentSection - 1)}
						>
							<ChevronLeft />
							Back
						</Button>

						<Button>
							{currentSection < 6 ? "Next" : "Submit"}
							<ChevronRight />
						</Button>
					</div>
				</>
			)}

			{currentSection == 7 && (
				<>
					<h3 className="text-xl font-extrabold dark:text-white flex items-center">
						You should choose {streams[marks.indexOf(Math.max(...marks))]}.
					</h3>

					<div className="-mt-7">
						<p>
							Your overall score is{" "}
							{checkboxes.filter((checkbox) => checkbox).length}.
						</p>

						<h5 className="font-bold text-lg mt-4 mb-2">Details</h5>

						<table
							border={1}
							className="border-black [&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800 w-full text-center"
						>
							<thead>
								<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
									<th className="w-2 px-6">Section</th>
									<th>Marks</th>
								</tr>
							</thead>

							<tbody>
								<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
									<td>A</td>
									<td>
										{marks[0]} out of{" "}
										{questions[0].map((question) => question.options).flat(Infinity).length}
									</td>
								</tr>
								<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
									<td>B</td>
									<td>
										{marks[1]} out of{" "}
										{questions[1].map((question) => question.options).flat(Infinity).length}
									</td>
								</tr>
								<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
									<td>C</td>
									<td>
										{marks[2]} out of{" "}
										{questions[2].map((question) => question.options).flat(Infinity).length}
									</td>
								</tr>
								<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
									<td>D</td>
									<td>
										{marks[3]} out of{" "}
										{questions[3].map((question) => question.options).flat(Infinity).length}
									</td>
								</tr>
								<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
									<td>E</td>
									<td>
										{marks[4]} out of{" "}
										{questions[4].map((question) => question.options).flat(Infinity).length}
									</td>
								</tr>
								<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
									<td>F</td>
									<td>
										{marks[5]} out of{" "}
										{questions[5].map((question) => question.options).flat(Infinity).length}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="flex justify-end">
						<Button className="gap-1">
							{saved ? "Saved" : "Save"}
							{saved ? <Check /> : <Save />}
						</Button>
					</div>
				</>
			)}
		</form>
	)
}

function optionCountTillSection(start: number, end: number) {
	return questions
		.slice(start, end)
		.flat(Infinity)
		.map((question: any) => question.options)
		.flat(Infinity).length
}
