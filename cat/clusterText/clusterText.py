from bertopic import BERTopic
from sentence_transformers import SentenceTransformer
import nltk

# Define the text and activity topics
text = """
Yesterday, I went hiking in the mountains. Later, I had dinner at a local restaurant.
Today, I worked on a coding project and went for a run in the evening. I love outdoor activities like camping and cycling.
"""
activities = ["Hiking", "Outdoor Activities", "Food and Dining", "Work", "Fitness"]

# Preprocess: Tokenize sentences
nltk.download('punkt')
sentences = nltk.sent_tokenize(text)

# Generate sentence embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(sentences)

# Cluster sentences into subtopics using BERTopic
topic_model = BERTopic()
topics, probs = topic_model.fit_transform(sentences, embeddings)

# Assign subtopics to predefined activities
activity_mapping = {}
for i, topic in enumerate(set(topics)):
    topic_sentences = [sentences[j] for j in range(len(topics)) if topics[j] == topic]
    topic_embedding = model.encode(topic_sentences, convert_to_tensor=True).mean(dim=0)
    activity_similarities = util.pytorch_cos_sim(topic_embedding, model.encode(activities))
    best_activity_idx = activity_similarities.argmax().item()
    activity_mapping[topic] = activities[best_activity_idx]

# Output results
for i, sentence in enumerate(sentences):
    print(f"Sentence: '{sentence}' -> Activity: '{activity_mapping[topics[i]]}'")
