import cohere 

COHERE_API_KEY = "aojQMA01guv79g9YULby6UPpTtx2o1zDMknnpwhq"

def returnSummary(text: str, API_KEY = COHERE_API_KEY):
  co = cohere.Client(API_KEY)
  response = co.summarize(text=text, length='medium',
    format='paragraph',
    model='summarize-xlarge',
    additional_command='Seperate into Bullet Points',
    temperature=0.3,
  ).summary

  assert response != ""
  return response

