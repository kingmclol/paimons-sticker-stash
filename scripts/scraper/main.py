"""
entrypoint for scraper
"""

from asyncio import log
import sys
import argparse
import traceback

from utils import log
from enums import ScrapeResult
from scraper import *

parser = argparse.ArgumentParser(description="Scrape stickers from Genshin Impact Wiki")
parser.add_argument(
    "--current",
    action="store_true",
    help="Scrape from the latest most recently scraped set",
)
parser.add_argument(
    "--to-latest",
    action="store_true",
    help="Scrape from latest set until no new sets are found",
)
parser.add_argument(
    "--set",
    type=str,
    help="Scrape a specific sticker set by name (e.g., '1', '2', '3', etc.)",
)
parser.add_argument(
    "--all",
    action="store_true",
    help="Scrape all *numerical* sticker sets from 1 to latest",
)
parser.add_argument(
    "--missing-titles",
    action="store_true",
    help="Scrape sticker sets marked as incomplete scrape (missing titles)",
)


def summarize_outcomes(outcomes: list[ScrapeOutcome]) -> None:
    log(f"Scrape summary:")
    log(ScrapeOutcome.summary_header())
    for outcome in outcomes:
        log(str(outcome))



def summarize_outcome(outcome: ScrapeOutcome) -> None:
    log(f"Scrape summary:")
    log(ScrapeOutcome.summary_header())
    log(str(outcome))


if __name__ == "__main__":
    args = parser.parse_args()
    result = scrape_latest_set()
    summarize_outcome(result)
    try:
        if args.current:
            result = scrape_latest_set()
            summarize_outcome(result)
        elif args.to_latest:
            results = scrape_until_no_new_sets()
            summarize_outcomes(results)
        elif args.set:
            result = scrape_sticker_set(args.set)
            summarize_outcome(result)
        elif args.all:
            # TODO:
            # results = scrape_all_sets()
            # summarize_results(results)
            pass
    except Exception as e:
        log(f"ERROR: Aborting scrape: {e}")
        print(traceback.format_exc())
        sys.exit(1)
