# FurniChad
## ~An AI Generated Furniture Tool
<br> FurniChAD is a powerful website designed to help users generate 3D models of furniture from a simple text prompt. With its advanced algorithms, FurniChAD is able to analyze the text prompt, generate the associated 2D image, and create a detailed 3D model, complete with Point Cloud and mesh files.

The website is easy to use and requires no prior knowledge of 3D modeling. Users simply input a text description of the furniture they want to create, such as "Futuristic Curvy Chair," and FurniChAD takes care of the rest. 

Overall, FurniChAD is a powerful and versatile website that makes 3D modeling accessible to everyone, regardless of their experience or skill level. Whether you're an interior designer, furniture manufacturer, or just someone who wants to create a custom piece for their home, FurniChAD has the tools you need to bring your vision to life.</br>
## **Current Situation:**
<p>Online furniture shopping has become increasingly popular in recent years, with many customers preferring the convenience of browsing and purchasing furniture from the comfort of their homes. However, there are still several problems associated with online furniture shopping that can make the experience less than ideal for some customers.

One of the major such problems is limited customization options:- Online furniture stores often offer limited customization options, making it difficult for customers to get exactly what they want. Customers may have difficulty visualizing how furniture will look in that customized form, leading to uncertainty and hesitation when making a purchase.
</p>


## **Problem!**
<p>The problem with online furniture shopping is that customers often face difficulties in finding the right furniture for their needs, due to a lack of expert guidance and limited customization options. Additionally, customers may struggle to visualize how the furniture will look in their space and have concerns about the quality and comfort of the product. These challenges can lead to dissatisfaction, returns, and negative customer experiences. A solution to these problems could be FurniChat, a virtual assistant that provides personalized advice, recommendations, and design inspiration to customers, helping them find the perfect furniture for their needs and ensuring a positive online shopping experience.
</p>

## **Tech Stacks:**
  - PyTorch
  - Stable Diffusion
  - Point-E
  - HuggingFace Diffusers
  - Streamlit
  - Firebase authentication
  
## **How to use?**
<p>Clone the repository with the following command:-</p>
<p>git clone https://github.com/UdAyAn123/FurniChad</p>

<p>Install all the dependencies via:-</p>
<p>pip install -r requirements.txt</p>

<p>After cloning the repository download the models from the links provided in the models folder and copy them to the models folder.

Open the terminal in this directory and type:-
streamlit run app.py

After that, open 'index.html'

</p>

## **References:-**
  <p> Stable Diffusion v2 Base Model: https://huggingface.co/stabilityai/stable-diffusion-2-base  </p>
  <p> Point-E Model (Image to PointCloud and PointCloud to Mesh File): https://github.com/openai/point-e </p>
