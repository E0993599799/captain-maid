use maw_matcher::match_pattern;

fn main() {
    let pattern = "*";
    let input = "mission-control";
    
    if match_pattern(pattern, input) {
        println!("✅ Pattern '{}' matched '{}'", pattern, input);
    } else {
        println!("❌ Pattern '{}' did not match '{}'", pattern, input);
    }
}
