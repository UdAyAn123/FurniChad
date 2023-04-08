import streamlit as st 
import pickle
import torch
from tqdm.auto import tqdm
import gc
from point_e.util.plotting import plot_point_cloud
from PIL import Image

device = 'cuda' if torch.cuda.is_available() else 'cpu'

st.beta_set_page_config(page_title="FurniChAD", page_icon="🌿", layout='centered', initial_sidebar_state="collapsed")

def load_model(modelfile):
	loaded_model = pickle.load(open(modelfile, 'rb'))
	return loaded_model

def main():
    # title
    html_temp = """
    <div>
    <h1 style="color:MEDIUMSEAGREEN;text-align:left;"> FurniChAD </h1>
    </div>
    """
    st.markdown(html_temp, unsafe_allow_html=True)

    col1,col2  = st.beta_columns([2,2])
    
    with col1: 
        with st.beta_expander(" ℹ️ Information", expanded=True):
            st.write("""
            With the help of Stable Diffusion and Point2E, we are creating furniture design and their approximate 3D model.
            """)
        '''
        ## How does it work ❓ 
        It generated 2D image from a text prompt with the help of Stable Diffusion and from that 2D image we generate a 3D point model.
        '''


    with col2:
        st.subheader("Dive deep into FurniWorld")
        prompt = st.text_input("Enter the prompt")

        if st.button('Generate'):
            pipe = load_model('models\pipe.pkl')
            sampler = load_model('models\sampler.pkl')
            pipe.to(device)
            pipe.enable_attention_slicing()
            image = pipe(prompt).images[0]
            image.save("prompt.png")

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
            fig.save("3dplot.png")
            plot_3d = Image.open("3dplot.png")


            col1.write('''
		    ## Results 🔍 
		    ''')
            col1.success(st.image(img,caption="2D Image"))
            st.image(plot_3d,caption='3D Views of the Image')
      #code for html ☘️ 🌾 🌳 👨‍🌾  🍃

    st.warning("Note: This is a StreamLit Demo")
    hide_menu_style = """
    <style>
    #MainMenu {visibility: hidden;}
    </style>
    """

hide_menu_style = """
        <style>
        #MainMenu {visibility: hidden;}
        </style>
        """
st.markdown(hide_menu_style, unsafe_allow_html=True)

if __name__ == '__main__':
	main()