import asyncio
import io
import glob
import os
import sys
import time
import uuid
import glob
import threading
import requests
from urllib.parse import urlparse
from io import BytesIO
from PIL import Image, ImageDraw
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
import telebot
all_list = glob.glob("C:\\Users\\ansko\\Desktop\\images\\*.jpg")
all_user_ids = ['@roctbb', "@"]
G = [{"photos": all_list, "name":["Ростислав Бородин", "Федор Фальковский", "Маша Федотова"] }]
all_list = glob.glob("C:\\Users\\ansko\\Desktop\\images\\*.jpg")

STATE = {'face_ids': {'@geonerus': 'face_identificator1'}, 'paths': set([])}
STATE['face_ids'][' key'] = '@geonerus'
files = glob.glob("C:\\Users\\ansko\\Desktop\\images\\*.jpg")
list_of_files = [files]
KEY = "there was key"
ENDPOINT = "there was endpoint"

path = f"C:\\Users\\ansko\\PycharmProjects\\BotForGoTo_v_Litsakh\\"

token = 'there was bot token'
bot = telebot.TeleBot(token)



def process_photo(filename):
    # TODO: detect faces and send notifications
    pass


@bot.message_handler(commands=['start'])
def welcome(message):
    bot.send_message(message.chat.id,
                     "Добро пожаловать, {0.first_name}!\nЯ - <b>{1.first_name}</b>. С помощью меня ты сможешь: \n */change - поменять свою фотографию, которая есть на сайте; \n получать уведомления. когда появится на сайте какая-нибудь фотка с тобой.".format(
                         message.from_user, bot.get_me()),
                 parse_mode='html')


@bot.message_handler(content_types=['text', 'photo'])
def main(message):
    username = message.chat.username
    print(username)
    bot.send_message(message.chat.id, "ok, boomer")
    train_group(G)
    bot.send_message(message.chat.id, msg)
    time.sleep(45)




def test_threading():
    global STATE
    while True:
        time.sleep(1)
        # print('thread', STATE['paths'])
        set_of_curr_files = set(glob.glob("C:\\Users\\ansko\\Desktop\\images\\*.jpg"))
        # print(STATE['paths'])
        set_of_new_files = STATE['paths'] - set_of_curr_files
        if not set_of_new_files:
            STATE['paths'] = set_of_curr_files


def train_group(G):
    global msg
    #all_files = list(STATE['paths'])
    all_files = glob.glob("C:\\Users\\ansko\\Desktop\\images\\*.jpg")
    all_files.sort(key=os.path.getmtime)
    print(all_files)
    PERSON_GROUP_ID = str(uuid.uuid4())
    face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY))
    face_client.person_group.create(person_group_id=PERSON_GROUP_ID, name=PERSON_GROUP_ID)
    # for i in range(len(glob.glob("C:\\Users\\ansko\\Desktop\\images\\*.jpg"))):
    felix = face_client.person_group_person.create(PERSON_GROUP_ID, "Феликс")
    fedor = face_client.person_group_person.create(PERSON_GROUP_ID, "Федор")
    maria = face_client.person_group_person.create(PERSON_GROUP_ID, "Маша Федотова")
    roct = face_client.person_group_person.create(PERSON_GROUP_ID, "Ростислав")
    felix_images = [file for file in glob.glob("C:\\Users\\ansko\\Desktop\\images\\fel*.jpg")]
    fedor_images = [file for file in glob.glob("C:\\Users\\ansko\\Desktop\\images\\fed*.jpg")]
    maria_images = [file for file in glob.glob("C:\\Users\\ansko\\Desktop\\images\\ma*.jpg")]
    roct_images = [file for file in glob.glob("C:\\Users\\ansko\\Desktop\\images\\roc*.jpg")]
    for image in felix_images:
        w = open(image, 'r+b')
        face_client.person_group_person.add_face_from_stream(PERSON_GROUP_ID, felix.person_id, w)

    for image in roct_images:
        m = open(image, 'r+b')
        face_client.person_group_person.add_face_from_stream(PERSON_GROUP_ID, roct.person_id, m)

    for image in maria_images:
        ch = open(image, 'r+b')
        face_client.person_group_person.add_face_from_stream(PERSON_GROUP_ID, maria.person_id, ch)
    for image in fedor_images:
        we = open(image, 'r+b')
        face_client.person_group_person.add_face_from_stream(PERSON_GROUP_ID, fedor.person_id, we)
    face_client.person_group.train(PERSON_GROUP_ID)
    test_image = all_files[-1]
    img = open(test_image, 'r+b')
    print('Pausing for 60 seconds to avoid triggering rate limit on free account...')
    time.sleep(60)
    face_ids = []

    faces = face_client.face.detect_with_stream(img, detection_model='detection_03', return_face_id=True)
    for face in faces:
        face_ids.append(face.face_id)
    results = face_client.face.identify(face_ids, PERSON_GROUP_ID)
    print('Identifying faces in {}'.format(os.path.basename(img.name)))
    if not results:
        print('No person identified in the person group for faces from {}.'.format(os.path.basename(img.name)))
    for person in results:
        if len(person.candidates) > 0:
            msg = person.face_id
            print('Person for face ID {} is identified in {} with a confidence of {}.'.format(person.candidates[0].person_id,
                                                                                              os.path.basename(
                                                                                                  img.name),
                                                                                              person.candidates[
                                                                                                  0].confidence))
        else:
            print('No person identified for face ID {} in {}.'.format(person.face_id, os.path.basename(img.name)))
    # bot.send_message(message.chat.id, "okay")


if __name__ == "__main__":
    threading.Thread(target=test_threading, args=()).start()
    bot.polling(none_stop=True)

