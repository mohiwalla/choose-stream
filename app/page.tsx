"use client"

import { questions } from "@/app/config/chosse-stream-questions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

export default function Enroll() {
	const [loading, setLoading] = useState(true)
	const [userData, setUserData] = useState({
		name: "",
		ePunjabID: "",
		phone: "",
	})
	const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h"]
	const [currentSection, setCurrentSection] = useState(0)
	const [checkboxes, setCheckboxes] = useState(
		new Array(
			questions
				.flat(Infinity)
				.map((question: any) => question.options)
				.flat(Infinity).length
		).fill(false)
	)
	const streams = [
		"Health & Medicine",
		"Agriculture & Sciences",
		"Arts & Communication",
		"Engineering & Technology",
		"Buniness & Management",
		"Public Service",
	]

	const marks = [
		checkboxes
			.slice(0, optionCountTillSection(0, 1))
			.filter((checkbox) => checkbox).length,
		checkboxes
			.slice(optionCountTillSection(0, 1), optionCountTillSection(0, 2))
			.filter((checkbox) => checkbox).length,
		checkboxes
			.slice(optionCountTillSection(0, 2), optionCountTillSection(0, 3))
			.filter((checkbox) => checkbox).length,
		checkboxes
			.slice(optionCountTillSection(0, 3), optionCountTillSection(0, 4))
			.filter((checkbox) => checkbox).length,
		checkboxes
			.slice(optionCountTillSection(0, 4), optionCountTillSection(0, 5))
			.filter((checkbox) => checkbox).length,
		checkboxes
			.slice(optionCountTillSection(0, 5), optionCountTillSection(0, 6))
			.filter((checkbox) => checkbox).length,
	]
	const topTwoStreams = marks
		.map((mark, index) => ({ mark, stream: streams[index] }))
		.sort((a, b) => b.mark - a.mark)
		.slice(0, 2)

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		if (currentSection < 7) {
			if (currentSection == 6) {
				const formData = new FormData()

				formData.append("name", userData.name)
				formData.append("ePunjabID", userData.ePunjabID)
				formData.append("phone", userData.phone)
				formData.append(
					"marks",
					checkboxes.map((checkbox) => (checkbox ? 1 : 0)).join()
				)

				fetch("/api/choose-stream", {
					method: "post",
					body: JSON.stringify(Object.fromEntries(formData)),
				}).then(() => setLoading(false))
			}

			return changeSection(currentSection + 1)
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
							onChange={(e) =>
								setUserData({
									...userData,
									name: e.currentTarget.value,
								})
							}
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
							onChange={(e) =>
								setUserData({
									...userData,
									ePunjabID: e.currentTarget.value,
								})
							}
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
							onChange={(e) =>
								setUserData({
									...userData,
									phone: e.currentTarget.value,
								})
							}
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
																	optionCountTillSection(
																		0,
																		currentSection - 1
																	) +
																		questions[currentSection - 1]
																			.slice(0, questionIndex)
																			.map((question) => question.options)
																			.flat(Infinity).length +
																		optionIndex
																]
															}
															onCheckedChange={(isChecked) => {
																const index =
																	optionCountTillSection(
																		0,
																		currentSection - 1
																	) +
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

			{currentSection == 7 &&
				(loading ? (
					<div className="flex justify-center items-center py-6">
						<Loader2 className="animate-spin w-12 h-auto" strokeWidth={2.5} />
					</div>
				) : (
					<>
						<div>
							<h3 className="text-xl font-extrabold dark:text-white flex items-center">
								Top streams for you:
							</h3>
							<ul className="mt-4">
								{topTwoStreams.map(({ stream, mark }, index) => (
									<li key={index}>
										<b>{stream}:</b> {mark} points
									</li>
								))}
							</ul>
						</div>

						<div className="-mt-2">
							<p>Your highest score is {topTwoStreams[0].mark}.</p>

							<h5 className="font-bold text-lg mt-4 mb-2">Details</h5>

							<table
								border={1}
								className="border-black [&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800 w-full"
							>
								<thead>
									<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800 text-left">
										<th className="px-4 py-1">Section</th>
										<th className="px-4 py-1">Marks</th>
									</tr>
								</thead>

								<tbody>
									<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
										<td className="px-4 py-1">{streams[0]}</td>
										<td className="px-4 py-1">
											{marks[0]} out of{" "}
											{
												questions[0]
													.map((question) => question.options)
													.flat(Infinity).length
											}
										</td>
									</tr>
									<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
										<td className="px-4 py-1">{streams[1]}</td>
										<td className="px-4 py-1">
											{marks[1]} out of{" "}
											{
												questions[1]
													.map((question) => question.options)
													.flat(Infinity).length
											}
										</td>
									</tr>
									<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
										<td className="px-4 py-1">{streams[2]}</td>
										<td className="px-4 py-1">
											{marks[2]} out of{" "}
											{
												questions[2]
													.map((question) => question.options)
													.flat(Infinity).length
											}
										</td>
									</tr>
									<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
										<td className="px-4 py-1">{streams[3]}</td>
										<td className="px-4 py-1">
											{marks[3]} out of{" "}
											{
												questions[3]
													.map((question) => question.options)
													.flat(Infinity).length
											}
										</td>
									</tr>
									<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
										<td className="px-4 py-1">{streams[4]}</td>
										<td className="px-4 py-1">
											{marks[4]} out of{" "}
											{
												questions[4]
													.map((question) => question.options)
													.flat(Infinity).length
											}
										</td>
									</tr>
									<tr className="[&>*]:border [&>*]:border-gray-400 [&>*]:dark:border-gray-800">
										<td className="px-4 py-1">{streams[5]}</td>
										<td className="px-4 py-1">
											{marks[5]} out of{" "}
											{
												questions[5]
													.map((question) => question.options)
													.flat(Infinity).length
											}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</>
				))}
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
