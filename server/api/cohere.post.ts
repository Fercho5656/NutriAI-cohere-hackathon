import cohere from 'cohere-ai'

export default defineEventHandler(async (event) => {
  const { energyRequirement } = await readBody(event)
  const runtimeConfig = useRuntimeConfig()
  console.log(`COHERE_KEY: ${runtimeConfig.COHERE_KEY}`)
  cohere.init(runtimeConfig.COHERE_KEY)
  const response = await cohere.generate({
    model: 'xlarge',
    prompt: `Write an eating plan of 1780 kilocalories in JSON format:\n{\n\"name\": \"Nourish and Fuel\",\n\"kilocalories\": 1780,\n\"breakfast\": [\"1 cup of oatmeal with 1/2 cup of berries and 1 tsp of honey\", \"1 cup of Greek yogurt with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"lunch\": [\"2 cups of mixed greens with 1 cup of grilled chicken, 1/4 cup of crumbled feta cheese, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\"],\n\"snack\": [\"1 cup of unsweetened almond milk with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"dinner\": [\"1 cup of brown rice with 1 cup of grilled chicken, 1/4 cup of steamed broccoli, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\", \"1 apple\"]\n}\n--\nWrite an eating plan of ${energyRequirement} kilocalories in JSON format:`,
    max_tokens: 350,
    temperature: 2,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  })
  const str = response.body.generations[0].text
  console.log(str)
  const splitStr = str.split('--')[0]
  const strIdx = splitStr.indexOf('}')
  const strObj = splitStr.slice(0, strIdx + 1)
  return JSON.parse(strObj)
})