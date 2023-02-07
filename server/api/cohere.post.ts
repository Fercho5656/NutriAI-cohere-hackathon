import cohere from 'cohere-ai'

const COHERE_API_KEY = '4vQrZ6kHFoNh3Ufv2qxMrFSAhgGFuKL7NmsgOpd2'
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate'

export default defineEventHandler(async (event) => {
  const { energyRequirement } = await readBody(event)
  const runtimeConfig = useRuntimeConfig()
  console.log(`COHERE_KEY: ${runtimeConfig.COHERE_KEY}`)

  const data = {
    model: 'xlarge',
    prompt: `Write an eating plan of 1780 kilocalories in JSON format:\n{\n\"name\": \"Nourish and Fuel\",\n\"kilocalories\": 1780,\n\"breakfast\": [\"1 cup of oatmeal with 1/2 cup of berries and 1 tsp of honey\", \"1 cup of Greek yogurt with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"lunch\": [\"2 cups of mixed greens with 1 cup of grilled chicken, 1/4 cup of crumbled feta cheese, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\"],\n\"snack\": [\"1 cup of unsweetened almond milk with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"dinner\": [\"1 cup of brown rice with 1 cup of grilled chicken, 1/4 cup of steamed broccoli, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\", \"1 apple\"]\n}\n--\nWrite an eating plan of ${energyRequirement - 500} kilocalories in JSON format:`,
    max_tokens: 40,
    temperature: 0.3,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE',
  }

  const { results } = await fetch(COHERE_API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": 'application/json',
      "Cohere-Version": '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  return results

  cohere.init("4vQrZ6kHFoNh3Ufv2qxMrFSAhgGFuKL7NmsgOpd2")
  const response = await cohere.generate({
    model: 'xlarge',
    prompt: `Write an eating plan of 1780 kilocalories in JSON format:\n{\n\"name\": \"Nourish and Fuel\",\n\"kilocalories\": 1780,\n\"breakfast\": [\"1 cup of oatmeal with 1/2 cup of berries and 1 tsp of honey\", \"1 cup of Greek yogurt with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"lunch\": [\"2 cups of mixed greens with 1 cup of grilled chicken, 1/4 cup of crumbled feta cheese, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\"],\n\"snack\": [\"1 cup of unsweetened almond milk with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"dinner\": [\"1 cup of brown rice with 1 cup of grilled chicken, 1/4 cup of steamed broccoli, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\", \"1 apple\"]\n}\n--\nWrite an eating plan of ${energyRequirement - 500} kilocalories in JSON format:`,
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
  return response
  // return JSON.parse(strObj)
})

/* export default defineEventHandler(async (event) => {
  const { energyRequirement } = await readBody(event)
  const runtimeConfig = useRuntimeConfig()
  console.log(`COHERE_KEY: ${runtimeConfig.COHERE_KEY}`)
  cohere.init("4vQrZ6kHFoNh3Ufv2qxMrFSAhgGFuKL7NmsgOpd2")
  const response = await cohere.generate({
    model: 'xlarge',
    prompt: `Write an eating plan of 1780 kilocalories in JSON format:\n{\n\"name\": \"Nourish and Fuel\",\n\"kilocalories\": 1780,\n\"breakfast\": [\"1 cup of oatmeal with 1/2 cup of berries and 1 tsp of honey\", \"1 cup of Greek yogurt with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"lunch\": [\"2 cups of mixed greens with 1 cup of grilled chicken, 1/4 cup of crumbled feta cheese, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\"],\n\"snack\": [\"1 cup of unsweetened almond milk with 1/2 cup of mixed nuts and 1 tsp of honey\"],\n\"dinner\": [\"1 cup of brown rice with 1 cup of grilled chicken, 1/4 cup of steamed broccoli, and 1/4 cup of sliced red onion\", \"1/2 cup of cooked quinoa with 1/4 cup of black beans, 1/4 cup of chopped tomato, and 1/4 cup of chopped avocado\", \"1 cup of unsweetened almond milk\", \"1 apple\"]\n}\n--\nWrite an eating plan of ${energyRequirement - 500} kilocalories in JSON format:`,
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
  return response
  // return JSON.parse(strObj)
}) */