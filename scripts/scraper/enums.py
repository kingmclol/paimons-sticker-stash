"""
Enums used in the scraper
"""

from enum import Enum


class DownloadResult(Enum):
    SUCCESS = 0
    FAILURE = 1
    SKIPPED_ALREADY_EXISTS = 2


class ScrapeResult(Enum):
    """
    Enum for scraper run results.
    - SUCCESS: Scraper run completed successfully
    - FAILURE_NO_DATA: Failure due to no data (i.e., empty page/nonexistent)
    - FAILURE: Failure due to error
    - FAILURE_TOO_MANY_MISSING_TITLES: Failure due to too many missing titles (> MAX_UNKNOWN_TITLE_STICKERS_ABORT)
    - SUCCEESS_MISSING_TITLES: Scraper run completed, but with missing titles (> MAX_UNKNOWN_TITLE_STICKERS_SUCCESSFUL). The stickers are downloaded, so mark set as incomplete and scrape later.
    """

    SUCCESS = 0
    FAILURE_NO_DATA = 1
    FAILURE = 2
    FAILURE_TOO_MANY_MISSING_TITLES = 3
    SUCCESS_MISSING_TITLES = 4

    @property
    def is_failure(self):
        return self in {
            ScrapeResult.FAILURE,
            ScrapeResult.FAILURE_NO_DATA,
            ScrapeResult.FAILURE_TOO_MANY_MISSING_TITLES,
        }

    @property
    def is_success(self):
        return self in {
            ScrapeResult.SUCCESS_MISSING_TITLES,
            ScrapeResult.SUCCESS,
        }