from flask import Flask
import pickle
import torch
from tqdm.auto import tqdm
import gc
from point_e.util.plotting import plot_point_cloud
from PIL import Image

app = Flask(__name__)

def load_model(modelfile):
	loaded_model = pickle.load(open(modelfile, 'rb'))
	return loaded_model

device = 'cuda' if torch.cuda.is_available() else 'cpu'

@app.route('/')

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
    return "hello"

if __name__ == '__main__':
    app.run()