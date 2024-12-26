from bertopic import BERTopic
from sentence_transformers import SentenceTransformer, util
import nltk

# Input text
text = """
This morning, I woke up to my cat, Luna, gently nudging my hand with her nose. After stretching, she followed me to the kitchen, where I made coffee and fed her breakfast. She purred contentedly as she enjoyed her meal. Later, while I worked on my laptop, Luna perched on the windowsill, watching birds with keen interest. In the afternoon, we played with her favorite feather toy, her agile leaps making me laugh. As the sun set, Luna curled up beside me on the couch, her warmth a comforting presence. It was a simple, peaceful day, shared with my furry friend.
"""

# Predefined activity topics
activities = ["Play with toy", "hide and seek", "tag or fetch", "Brushing", "Watch TV", "feeding treat", "take a nap"]

# 1. Preprocess: Tokenize sentences
# nltk.download('punkt')
sentences = nltk.sent_tokenize(text)

# 2. Generate embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")
sentence_embeddings = model.encode(sentences, convert_to_tensor=True)
activity_embeddings = model.encode(activities, convert_to_tensor=True)

# 3. Compute similarity and cluster sentences into topics
topic_similarities = util.pytorch_cos_sim(sentence_embeddings, activity_embeddings)

# 4. Map each sentence to the most similar activity
sentence_to_activity = {}
for idx, sentence in enumerate(sentences):
    best_activity_idx = topic_similarities[idx].argmax().item()
    sentence_to_activity[sentence] = activities[best_activity_idx]

# 5. Group sentences by activity
grouped_sentences = {activity: [] for activity in activities}
for sentence, activity in sentence_to_activity.items():
    grouped_sentences[activity].append(sentence)

# Output results
for activity, grouped in grouped_sentences.items():
    print(f"Activity: {activity}")
    for sentence in grouped:
        print(f" - {sentence}")
    print()
