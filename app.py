from flask import Flask, render_template, request
from PIL import Image
import torch
from tqdm.auto import tqdm
import pickle
from point_e.util.plotting import plot_point_cloud
import time
import gc


app = Flask(__name__)

# Load model
def load_model(modelfile):
	loaded_model = pickle.load(open(modelfile, 'rb'))
	return loaded_model

device = "cuda" if torch.cuda.is_available() else "cpu"

# Define function to generate 3D image
def generate_image(prompt):
    pipe = load_model('models\pipe.pkl')
    sampler = load_model('models\sampler.pkl')
    pipe.to(device)
    pipe.enable_attention_slicing()
    image = pipe(prompt).images[0]
    image.save("prompt"+".png")
    pipe.detach().cpu()
    torch.cuda.empty_cache()
    gc.collect()
    imgpath = 'prompt.png'
    img = Image.open(imgpath)
    samples = None
    for x in tqdm(sampler.sample_batch_progressive(batch_size=1, model_kwargs=dict(images=[img]))):
        samples = x
    pc = sampler.output_to_point_clouds(samples)[0]
    fig = plot_point_cloud(pc, grid_size=3)
    return fig



@app.route("/")
def home():
    return render_template("Template.html")

@app.route("/generate", methods=["POST"])
def generate():
    prompt = request.form["prompt"]
    image = generate_image(prompt)
    return tf.constant(image).numpy().tolist()

if __name__ == "__main__":
    app.run(debug=True)
