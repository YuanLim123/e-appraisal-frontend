const Question = [
	{ title: 'Quantity of Work', subtitle: `Consider the ability to consistently complete a   given amount of work within the specific time`, weightage: 3 },
	{ title: 'Quality of Work', subtitle: `Consider the accuracy, neatness and thoroughness of work produced and if work meets specifications`, weightage: 3 },
	{ title: 'Job Knowledge / Technical Skills', subtitle: `Assess depth and extent of job / technical know-how and application to the job`, weightage: 2 },
	{ title: 'Material Usage / Wastage', subtitle: `Consider the number of rejects / spoilage of materials and efficient use of materials`, weightage: 1 },
	{ title: 'Reaction Under Pressure', subtitle: `Consider the ability to withstand work pressure during peak loads and to comply with work schedule even in face of difficulties`, weightage: 1 },
	{ title: 'Attendance and Health', subtitle: `Work Attendance : Lateness / absenteeism / unpaid and sick leave.  Consider punctuality and conscientiousness for reporting at work regularly and on time as well as condition of health, physical endurance and vitality`, weightage: 2 },
	{ title: 'Safety Consciousness / Housekeeping', subtitle: `Attitude towards maintaining work place and surrounding areas in a safe and orderly manner`, weightage: 1 },
	{ title: 'Care of Tools / Equipment', subtitle: `Consider the extent to which the employee cares for and maintains the tools and equipment under his charge`, weightage: 1 },
	{ title: 'Communication', subtitle: `Ability to express ideas, thoughts and instructions verbally and in writing (where applicable)`, weightage: 1 },
	{ title: 'Dependability', subtitle: `Consider the ability to work independently to fulfill the responsibilities of his position`, weightage: 1 },
	{ title: 'Discipline', subtitle: `Consider conformity to Company's rules and regulations, verbal/written warnings during current appraisal period`, weightage: 1 },
	{ title: 'Timeliness', subtitle: `Consider the speed, sense of urgency and high energy level in completing work`, weightage: 1 },
	{ title: 'Cooperation / Teamwork',subtitle: `Consider willingness to assist in work and to work in harmony with others in a group to achieve results`, weightage: 1},
	{ title: 'Initiative', subtitle: `Consider the ability to take prior action without being told and making positive contributions beyond the normal duties`, weightage: 1 },
];

const FeedbackQuestion = [
	`Indicate employee's greatest strength / weakness by using specific examples of performance when your overall rating is "Excellent" or "Poor"`,
	`Establish a plan and objectives with employee which include specific actions the employee can take to maintain or increase effectiveness. The objectives are the results the employee intends to achieve.`,
	`List the areas of training (attitude / skills / knowledge) that you consider necessary to help to improve employee's performance.`
];

export default { Question, FeedbackQuestion };
