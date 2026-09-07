"""
Misc types
"""

from enums import ScrapeResult


class ScrapeOutcome:
    """
    Summary of a scrape operation
    Attributes:
        - num_success: Number of stickers successfully scraped
        - num_failure: Number of stickers failed to scrape
        - num_missing_title: Number of stickers with missing titles (regardless of success or failure)
        - result: Overall result of the scrape operation (ScrapeResult)
        - set_name: Name of the sticker set scraped
        - is_success: Whether the scrape operation was successful
        - is_failure: Whether the scrape operation failed
    """

    num_success: int
    num_failure: int
    num_missing_title: int
    result: ScrapeResult
    set_name: str
    is_success: bool
    is_failure: bool

    def __init__(
        self,
        set_name: str,
        result: ScrapeResult = ScrapeResult.FAILURE,
        num_success: int = 0,
        num_failure: int = 0,
        num_missing_title: int = 0,
    ):
        self.num_success = num_success
        self.num_failure = num_failure
        self.num_missing_title = num_missing_title
        self.result = result
        self.set_name = set_name
        self.is_failure = result.is_failure
        self.is_success = result.is_success

    @property
    def num_total(self) -> int:
        return self.num_success + self.num_failure

    def __str__(self) -> str:
        return f"{self.set_name:<15}{self.num_total:<12}{self.num_success:<12}{self.num_failure:<12}{self.num_missing_title:<12}{self.result.name:<30}"

    @staticmethod
    def summary_header() -> str:
        return f"{"SET NAME":<15}{"TOTAL":<12}{"SUCCESS":<12}{"FAILURE":<12}{"MISS_TITLE":<12}{"RESULT":<30}"
