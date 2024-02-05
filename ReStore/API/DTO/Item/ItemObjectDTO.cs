using API.DTO.Item.Enum;
using System.Text.Json.Serialization;

namespace API.DTO.Item;

public class ItemObjectDTO
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string Desc { get; set; }

    public int SortOrder => Status == StatusDTO.Planerat ? 1 : Status == StatusDTO.Pågående ? 2 : Status == StatusDTO.Testar ? 3 : 4;
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TagDTO Tag { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public StatusDTO Status { get; set; }
}