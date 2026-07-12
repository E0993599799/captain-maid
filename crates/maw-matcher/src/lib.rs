//! Maw Matcher - Pattern matching library for mission-control
//!
//! Provides efficient pattern matching and routing capabilities.

pub fn match_pattern(pattern: &str, input: &str) -> bool {
    pattern == input || pattern == "*"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_exact_match() {
        assert!(match_pattern("hello", "hello"));
    }

    #[test]
    fn test_wildcard() {
        assert!(match_pattern("*", "anything"));
    }

    #[test]
    fn test_no_match() {
        assert!(!match_pattern("hello", "world"));
    }
}
