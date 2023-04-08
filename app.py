import streamlit as st 
import pickle
import torch
import gc
from point_e.util.plotting import plot_point_cloud
from PIL import Image
import time

device = 'cuda' if torch.cuda.is_available() else 'cpu'

st.set_page_config(page_title="FurniChAD", page_icon=":chair:", layout='centered', initial_sidebar_state="collapsed")

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

    col1,col2  = st.columns([2,2])
    
    with col1: 
        with st.expander(" ℹ️ Information", expanded=True):
            st.write("""
            With the help of Stable Diffusion and Point2E, we are creating furniture design and their approximate 3D point model.
            """)
        '''
        ## How does it work? 
        It generates 2D image from a text prompt with the help of Stable Diffusion model. The 2D image we generated is passed omto Point2E to generate a 3D point image.
        '''


    with col2:
        st.subheader("Dive deep into FurniWorld")
        prompt = st.text_input("Enter the prompt")

        if st.button('Generate'):
            t1 = time.time()
            pipe = load_model('models\pipe.pkl')
            sampler = load_model('models\sampler.pkl')
            pipe.to(device)
            pipe.enable_attention_slicing()
            image = pipe(prompt).images[0]
            image.save("prompt.png")
            t2 = time.time()
            time1 = t2-t1
            st.write('Image Generated in '+str(time1)+' seconds')
            st.image(Image.open("prompt.png"))
            pipe.to('cpu')
            torch.cuda.empty_cache()
            gc.collect()

            imgpath = 'prompt.png'
            img = Image.open(imgpath)
            samples = None
            st.write("3D Image Generation Started")
            for x in sampler.sample_batch_progressive(batch_size=1, model_kwargs=dict(images=[img])):
                samples = x
            pc = sampler.output_to_point_clouds(samples)[0]
            fig = plot_point_cloud(pc, grid_size=3)
            t3=time.time()
            fig.savefig("3dplot.jpg")
            plot_3d = Image.open("3dplot.jpg")
            time2 = t3-t2
            st.write('3D Image Done in '+str(time2)+' seconds')
            st.image(plot_3d,caption='3D Views')
            fig_full = plot_point_cloud(pc)
            fig_full.savefig('fullfig.jpg')
            full_fig = Image.open('fullfig.jpg')
            st.image(full_fig,caption="Enlarged View")
            col1.write('''
		    ## Results 🔍 
		    ''')
            col1.success(st.write("Successful Execution"))

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