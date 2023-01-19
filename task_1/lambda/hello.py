import json
from datetime import datetime
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    logger.info("This lambda Function Was Called At: %s" %(current_time))

